async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let tab = await chrome.tabs.query(queryOptions);
  return tab;
}

document.getElementById('savebutton').addEventListener('click', async () => {
      const tabInfo = await getCurrentTab()
    
      const username = document.getElementById('username-input').value;
      console.log(tabInfo[0].title)
      const newTab = {
        username: username,
        title: tabInfo[0].title,
        url: 'hello'
      }
      console.log(newTab)
      fetch('http://127.0.0.1:3000/api/addtab', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTab)
      })
        .then(res => console.log(JSON.stringify(res.json())))
    })


document.getElementById('getbutton').addEventListener('click', () => {
  const username = document.getElementById('username-input').value;
  if (username.length < 1) {
    alert('You must enter a username')
  }
  else {
    fetch(`http://127.0.0.1:3000/api/get-tabs/${username}`)
      .then(result => result.json())
      .then(response => {
        const data = JSON.stringify(response)
        document.getElementById('tabinfo').innerHTML = data
      })
  }
})

// function saveTabinfo() {

// }


