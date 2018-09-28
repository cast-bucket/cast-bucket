import { FETCH_INTERESTS } from "../types";

const interests = [
  {
    id: "1",
    name: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=100&q=60%20100w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=200&q=60%20200w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=300&q=60%20300w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=400&q=60%20400w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=500&q=60%20500w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=600&q=60%20600w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=700&q=60%20700w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=800&q=60%20800w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=900&q=60%20900w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1000&q=60%201000w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1100&q=60%201100w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1200&q=60%201200w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1296&q=60%201296w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1400&q=60%201400w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1600&q=60%201600w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1800&q=60%201800w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=2000&q=60%202000w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=2200&q=60%202200w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=2400&q=60%202400w,%20https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "User Experience",
    image:
      "https://images.unsplash.com/photo-1521710220939-d0513089dce9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad1c8b6b8608206cdd9f6a18f2ef1344&auto=format&fit=crop&w=1500&q=80"
  }
];

export function fetchInterests() {
  return function(dispatch) {
    dispatch({
      type: FETCH_INTERESTS,
      payload: interests
    });
  };
}
