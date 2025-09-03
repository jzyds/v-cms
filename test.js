async function login() {
  try {
    const req = await fetch('http://127.0.0.1:3000/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'root@root.com',
        password: 'root',
      }),
    })
    const data = await req.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const token = ``

async function createArticle() {
  try {
    const req = await fetch('http://localhost:3000/api/articles?depth=1&locale=', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${token}`,
      },
      body: JSON.stringify({
        title: 'zzzz13213123213',
        markdown: 'sadasdasjhsdjsahkd',
        slug: null,
        slugLock: null,
      }),
    })
    const data = await req.json()
  } catch (err) {
    console.log(err)
  }
}
