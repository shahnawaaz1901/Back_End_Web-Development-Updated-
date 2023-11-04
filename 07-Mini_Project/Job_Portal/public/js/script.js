var aTag = document.getElementsByTagName("a");
for (let everyTag of aTag) {
  everyTag.addEventListener("click", (e) => {
    console.log((e.target.parentElement).parentElement.getAttribute("href"));
  });
}
