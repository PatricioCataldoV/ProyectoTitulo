import React from 'react';
import api from "../redux/api";

function ButtonLike({ method, id, onClick }) {
    const handleClick = () => {
        if (method === 'post') {
            api.post(`api/post/${id}/like_post`, {id} )
            .then(response => {
              console.log('Like creado:', response.data.success);
              window.location.reload();
            })
            .catch(error => {
              console.error('Error al dar like:', error);
            });
        } else if (method === 'comment') {
            api.post(`api/comment/${id}/like_comment`, {id})
            .then(response => {
              console.log('Like creado:', response.data.success);
              window.location.reload();
            })
            .catch(error => {
              console.error('Error al dar like:', error);
            });
        }
      };

  return (
    <button className="form-button rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600" onClick={handleClick}>Me Gusta</button>
  );
} export default ButtonLike