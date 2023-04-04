import axios from "axios";
import canvasState from "../store/canvasState";

export function postImage(id, img) {
  return axios.post(`http://localhost:5000/image?id=${id}`, {
    img: img,
  });
}

export function getImage(id) {
  return axios.get(`http://localhost:5000/image?id=${id}`);
} 
 