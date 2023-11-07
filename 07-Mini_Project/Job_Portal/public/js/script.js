function deleteJob(id) {
  const result = confirm("Are You Sure you Want to Delete this Job..??");
  if (result) {
    fetch(`/delete-Job/${id}`,{
      method : 'POST'
    })
      .then((response) => {
        if(response.ok){
          window.location = "http://localhost:3200/jobs";
          window.alert('Job Deleted Successfully !!');
        }
      })
      .catch((err) => console.log(`Error While Deleting the Item : ${err}`));
  }
}
