const tileReveal = document.querySelectorAll('.tile-reveal')

const toggleActiveTile = function(e) {
  // look out for enter key press
  if (typeof e.keyCode !== 'undefined') {
    // if it's not an enter then bail
    if (e.keyCode !== 13) {
      return
    }
  }
  
  const tilesContainer = findParent(e.target, 'tile-reveal')
  const oldActiveTile = tilesContainer.querySelector('.tile.active')
  const newActiveTile = findParent(e.target, 'tile')
  
  // find out if the new tile is already active if it is then make it
  // inactive
  console.log(newActiveTile.classList)
  if (newActiveTile.classList.contains('active')) {
    newActiveTile.classList.remove('active');
    newActiveTile.setAttribute('aria-pressed', 'false')
  }
  // if it wasn't active then make it active
  else {
    newActiveTile.classList.toggle('active');
    newActiveTile.setAttribute('aria-pressed', 'true')
  }
  // now lets deactivate the old tiles
  if (oldActiveTile) {
    oldActiveTile.classList.remove('active')
    oldActiveTile.setAttribute('aria-pressed', 'false')
  }
}

/**
 * Recursive function to find parent .tile
 */
const findParent = function (el, className) {
  // if we have parent, then check if it's a tile
  if (el.classList && el.classList.contains(className)) {
    return el
  }
  // if it's not a tile then run this again
  else {
    const parent = el.parentElement
    return findParent(parent, className)
  }
}


tileReveal.forEach(t => {
  const tiles = t.querySelectorAll('.tile')
  tiles.forEach(tile => {
    // add a11y stuff
    tile.setAttribute('tabindex', '0')
    tile.setAttribute('role', 'button')
    tile.setAttribute('aria-role', 'button')
    tile.setAttribute('aria-pressed', 'false')
  })
  
  t.addEventListener('click', toggleActiveTile);
  t.addEventListener('keypress', toggleActiveTile);
})
