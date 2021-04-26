export const fetchUsers = (results = 10) => {
    return fetch(`https://randomuser.me/api?results=${results}&inc=name,picture`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data.results
                .map((result) => {
                    return {
                        avatar: result.picture.thumbnail,
                        name: `${result.name.first} ${result.name.last}`,
                    }
                })
        })
}