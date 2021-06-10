import { MetaHead } from '../components/global/'
import { JokeInvaders } from '../components/invaders/'

const Home = () => {
  return (
    <>
      <MetaHead />
      <div suppressHydrationWarning={true}>
        { process.browser &&  <JokeInvaders /> }
      </div>
    </>
  )
}

export default Home