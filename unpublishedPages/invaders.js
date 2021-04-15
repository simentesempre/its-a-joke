import MetaHead from '../components/global/MetaHead'
import SpaceInvaders from '../components/SpaceInvaders'

const Home = () => {
  return (
    <>
      <MetaHead />
      <div suppressHydrationWarning={true}>
        { process.browser &&  <SpaceInvaders /> }
      </div>
    </>
  )
}

export default Home