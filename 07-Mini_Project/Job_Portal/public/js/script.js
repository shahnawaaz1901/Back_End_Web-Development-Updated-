function deleteJob(id){
  const result = confirm();
  if(result){
    fetch(`http://localhost:3200/delete/${id}`)
  }
}
