import { useEffect, useState } from 'react';
import { useConfig } from "wagmi";
import { readContract, writeContract } from '@wagmi/core';
import ABI from "./ABI.json";

type Voting = {
  option1: string;
  option2: string;
  votes1: number;
  votes2: number;
  maxDate: number;
}

export default function Vote() {

  const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";

  const config = useConfig();

  const [message, setMessage] = useState<string>("");
  const [voting, setVoting] = useState<Voting> ({maxDate: 0, option1: "", option2: "", votes1: 0, votes2: 0});
  const [showVotes, setShowVotes] = useState<number>(0);

  useEffect(() => {
    readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: ABI,
      chainId: config.chains[0].id,
      functionName: "getCurrentVoting",
      args: []
    })
      .then(result => {
        console.log("Current Voting:", result);
        const voting = result as Voting;
        setVoting(voting);
      })
      .catch(err => {
        console.error(err);
        setMessage("Erro ao carregar votação. Verifique o contrato inteligente.");
        // Dados de fallback para teste
        setVoting({
          option1: "Participante A",
          option2: "Participante B",
          votes1: 100,
          votes2: 150,
          maxDate: Math.floor(Date.now() / 1000) + 86400 // +24 horas
        });
      }
    )
  }, [])

  function isExpired() {
    return Number(voting.maxDate) < (Date.now() / 1000);
  }

  function getMaxDate() {
    return new Date(Number(voting.maxDate) * 1000).toLocaleString("pt-BR");
  }

  function getImageurl(name: string) {
    switch(name){
      case "Maria": return "https://static.ndmais.com.br/2026/01/novos-participantes-do-bbb-26-1300x731.jpg";
      case "Monica": return "https://pbs.twimg.com/profile_images/1616444419334324480/9n2l8XoL_400x400.jpg";
      default: return "https://pbs.twimg.com/profile_images/1616444419334324480/9n2l8XoL_400x400.jpg";
    }
  }

  function doVote(choice: number) {
    writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: ABI,
      chainId: config.chains[0].id,
      functionName: "addVote",
      args: [choice],
    })
      .then((result) => {
        setShowVotes(choice);
        setMessage("Voto registrado com sucesso! Obrigado por participar.");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erro ao registrar voto. Tente novamente.");
      });
  }


  function btnVote2Click() {
    setMessage("Conectando a carteira...");
    doVote(2);
  }

  function btnVote1Click() {
    setMessage("Conectando a carteira...");
    doVote(1);
  }


  function getVotesCount(option: number) {
    if (option === 1) 
      return showVotes === option ? Number(voting.votes1) : Number(voting.votes1);
    
    else 
      return showVotes === option ? Number(voting.votes2) : Number(voting.votes2);
    
  }

  return (
    <div className='container px-4 py-5'>
      <div className='row align-items-center'>
        <h1 className='display-5 fw-bold lh-1 mb-3'>Webbb3</h1>
        <p className='lead'>Votação on-chain no BBB.</p>
        {
          isExpired() 
          ? <p className='lead mb-3'>Votação encerrada. Confira abaixo os resultados.</p> 
          : <p className='lead mb-3'>Você tem até {getMaxDate()} para deixar seu voto em um dos particapantes para que ele saia do programa.</p>
        }
      </div>
      <div className='row flex-lg-low-reverse align-items-center g-5 py-5'>
        <div className='col-5'>
          <h3 className='my-2 d-block mx-auto'>{voting.option1}</h3>
          <img src={getImageurl(voting.option1)} className='d-block mx-auto img-fluid rounded' width={250} height={250}/>
          {
            isExpired() || showVotes > 0 
            ? <button className='btn btn-secondary d-block p-3 my-2 d-block mx-auto' style={{width: 250}} disabled={true}>{getVotesCount(2)}</button>
            : <button className='btn btn-primary d-block p-3 my-2 d-block mx-auto' style={{width: 250}} onClick={btnVote1Click}>Quero que esse saia</button>
          }
        </div>
        <div className='col-5'>
          <h3 className='my-2 d-block mx-auto'>{voting.option2}</h3>
          <img src={getImageurl(voting.option2)} className='d-block mx-auto img-fluid rounded' width={250} height={250}/>
          {
            isExpired() || showVotes > 0
            ? <button className='btn btn-secondary d-block p-3 my-2 d-block mx-auto' style={{width: 250}} disabled={true}>{getVotesCount(1)}</button>
            : <button className='btn btn-primary d-block p-3 my-2 d-block mx-auto' style={{width: 250}} onClick={btnVote2Click}>Quero que esse saia</button>
          }
        </div>
      </div>
      <div className='row align-items-center'>
        <p className='message'>{message}</p>
      </div>
    </div>
  )
} 