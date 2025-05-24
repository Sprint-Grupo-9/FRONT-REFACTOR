export const CardSquad = ({ name, photoUrl }) => {
  return (
    <div className="w-[195px] h-[180px] rounded-2xl bg-card-grey items-center justify-center flex flex-col p-4">
      <div className="w-[104px] h-[320px] rounded-md bg-white flex items-center justify-center">
        <div className="w-[90px] h-[90px] bg-card-blue rounded-md flex items-center justify-center">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-full h-full object-cover rounded-md" />
          ) : (
            <span className="text-white">Sem foto</span>
          )}
        </div>
      </div>
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <p className="font-figtree text-xl font-semibold">{name}</p>
      </div>
    </div>
  );
}