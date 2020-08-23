export function updateCatClicks(url, data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      nickName: data.nickName,
      clicks: data.clicks,
      image: data.image,
    }),
  })
    .then(function (data) {
      console.log("Request success: ", data);
    })
    .catch(function (error) {
      console.log("Request failure: ", error);
    });
}
