
const api = async () => {
    await fetch("https://api.github.com/users/hadley/orgs").then((res) => {
        console.log(res);
        return res.json()
    })
}

api()

