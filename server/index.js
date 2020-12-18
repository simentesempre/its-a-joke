
require('dotenv').config()

const PORT = process.env.SERVER_PORT || 3001
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

const express = require('express')
const bodyParser = require('body-parser')
const mailchimp = require('@mailchimp/mailchimp_marketing')

const app = express()
app.use(bodyParser.json())

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

app.post('/newsletter', async (req, res) => {
  if(req.body && req.body.email) {
    subscribe(req.body.email)
    .then(() => {
        res.status(201).send('Email succesfully added.')
    })
    .catch(error => {
        const { status, title, detail } = error.response.body
        res.status(status).send(`${title} - ${detail}`)
    })
  } else {
      res.status(400).send('No email attached. Request rejected.')
  }
})

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
})