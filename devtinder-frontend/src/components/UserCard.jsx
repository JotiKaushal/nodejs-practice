import React from 'react'

const UserCard = ({user}) => {
  const {firstName, lastName, age, gender, about} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
    <figure>
      <img
        src= {user.photoUrl ? user.photoUrl : "data:image/jpeg;base64,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"}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+ " " + lastName}</h2>
     {age && gender && <p>{age + " "+ gender}</p>}
      {about && <p>{about}</p>}
      <div className="card-actions justify-center my-4">
        <button className="btn btn-primary">Ignore</button> <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard