// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mailchimp = require('@mailchimp/mailchimp_marketing')

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
})

const subscribe = async (email) => {
  return new Promise((resolve, reject) => {
      mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
          email_address: email,
          status: "subscribed",
      })
      .then(res => {
          resolve(res)
      })
      .catch(err => {
          reject(err)
      })
  })
};

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.method === 'POST') {
    if(req.body && req.body.email) {
      subscribe(req.body.email)
      .then(() => {
          res.status(201).json({ message: 'Email succesfully added.'})
      })
      .catch(error => {
          const { status, title, detail } = error.response.body
          res.status(status).json({ message: `${title} - ${detail}`})
      })
    } else {
        res.status(400).json({ message: 'No email attached. Request rejected.'})
    }
  } else {
    res.status(405).json({ message: 'Method not allowed'})
  }
}
