import { useConnect, useConnectors} from 'wagmi'

function Login() {
  const { connect, error } = useConnect()
  const connectors = useConnectors()

  return (
    <div className='container px-4 py-5'>
      <div className='row flex-lg-low-reverse align-items-center g-5 py-5'>
        <div className='col-6'>
           <img src='https://static.ndmais.com.br/2026/01/novos-participantes-do-bbb-26-1300x731.jpg' className='d-block mx-lg-auto img-fluid' alt='Bootstrap Themes' width={700} height={500} loading='lazy' />
        </div>
        <div className='col-6'>
            <h1 className='display-5 fw-bold lh-1 mb-3'>Welcome to the Webbb3
            </h1>
            <p className='lead'>Votação on-chain no BBB.</p>
            <p className='lead mb-3'>Autentique-se com a sua carteira e deixe o seu voto para o próximo paredão.</p>
        </div>
        <div>
          <button type='button' onClick={() => connect({connector: connectors[0]})} className='btn btn-primary btn-lg px-4 gap-3'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt='MetaMask Logo' width={20} height={20} className='me-2' />
            Connect Wallet
          </button>
        </div>
         <p className='message'>{error ? error.message : ""}</p>
      </div>
    </div>
  )
}

export default Login
