async function getCurrentTab() { // gets active tab info and returns object
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab;
}

// post active tab info when Save clicked. 
// Will change after authentication is implemented
document.getElementById('savebutton').addEventListener('click', async () => {
  const tabInfo = await getCurrentTab()
  const username = document.getElementById('username-input').value;
  console.log(tabInfo[0].title)
  const newTab = {
    username: username,
    title: tabInfo[0].title,
    url: 'hello'
  }
  fetch('http://127.0.0.1:3000/api/addtab', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTab)
  })
    .then(res => console.log(JSON.stringify(res.json()))) // remove when add element is complete
})

// gets all tabs for username raw json for now for testing purposes only
document.getElementById('getbutton').addEventListener('click', () => {
  const username = document.getElementById('username-input').value;
  if (username.length < 1) {
    alert('You must enter a username') // Will be better error message later i.e. toast
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
