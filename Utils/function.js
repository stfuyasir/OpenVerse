document.addEventListener("DOMContentLoaded", function () {
  const repoName = "ZeeshanMukhtar1/OpenVerse";
  const token = "c7b4b7f87f16470dca1111afc68024bc45c2358e";

    // api call to fetch contributors list
  fetch(`https://api.github.com/repos/${repoName}/contributors`, {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((contributors) => {
      const contributorsList = document.getElementById("contributors-list");
      contributors.forEach((contributor) => {
        // api call to convert username to Full Name
        fetch(`https://api.github.com/users/${contributor.login}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((userData) => {
            const card = document.createElement("div");
            card.classList.add("contributor-card");

            const image = document.createElement("img");
            image.src = userData.avatar_url;
            image.alt = `${userData.name}'s Profile Picture`;
            image.loading = "lazy";
            

            const name = document.createElement("p");
            name.textContent = userData.name || userData.login;

            card.appendChild(image);
            card.appendChild(name);
            contributorsList.appendChild(card);
          })
          .catch((error) =>
            console.error("Error fetching contributor details:", error)
          );
      });
    })
    .catch((error) => console.error("Error:", error));
});
