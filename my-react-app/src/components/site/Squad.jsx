import { CardSquad } from '../shared/CardSquad.jsx';
import Pataservice from '../shared/Pataservice.jsx';

const funcionarios = [
  { nome: "Lucas", genero: "male" },
  { nome: "Ana", genero: "female" },
  { nome: "Marcos", genero: "male" },
  { nome: "Juliana", genero: "female" },
  { nome: "Carlos", genero: "male" },
  { nome: "Fernanda", genero: "female" },
];

// Função utilitária para pegar uma foto aleatória baseada no gênero
function getRandomPhotoUrl(genero) {
  // O parâmetro 'gender' pode ser 'male' ou 'female'
  // O parâmetro 'rand' força uma imagem diferente a cada reload
  return `https://randomuser.me/api/portraits/${genero === "male" ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`;
}

export function Squad() {
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center">
      <div className="w-full h-full rounded-tl-[150px]  bg-white flex flex-start items-center p-9">
        <div className="w-3/4 h-full grid grid-flow-row grid-cols-3 gap-1 p-9">
          {funcionarios.map((f, i) => (
            <CardSquad
              key={i}
              name={f.nome}
              photoUrl={getRandomPhotoUrl(f.genero)}
            />
          ))}
        </div>
        <div className="w-1/4 h-full item-center justify-center">
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <span className='pl-24'>
              <Pataservice />
            </span>
            <p className='font-figtree text-navy-blue text-[48px] font-bold'>Equipe</p>
          </div>
        </div>
      </div>
    </div>
  );
}