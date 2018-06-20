function addTile() {
  var template = document.createElement('template');
  template.innerHTML = `<px-tile  main-title=""
                                  action-buttons='{"maxButtons":1,"items":[{"id":"editpackage","label":"Go to Package","size":"small","type":"bare","buttonIcon":true,"icon":"px-nav:open-context","isPrimary":true},{"id":"rename","label":"Rename package","icon":"px-utl:edit","disableSelect": "true"},{"id":"remove","label":"Remove package","icon":"px-vis:trash-series"}]}'
                                  title-editable="true"
                                  title-validator="window.TitleValidator"
                                  drop-handler="window.DropHandler"
                                  custom-class="small-container">
                                    <div slot='body' class='chip-dropzone' style='padding: 5px'>
                                      <px-chip-dropzone default-message='Add objects by selecting connected nodes from the chart. Adding 2 or more nodes will denormalize data together.'></px-chip-dropzone>
                                    </div>
                        </px-tile>`;
  document.getElementById('demo-tile-container').appendChild(template.content.firstChild);
}

function dragStartHandler(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.content);
}

function TitleValidator(title) {
  // Reject zero-length package names
  if (title.length === 0) {
    return {
      valid: false,
      message: 'Package name may not be empty'
    };
  }

  const titleLower = title.toLowerCase();

  // Loop through all px-tiles and test input value against px-tile titles.
  for (const tile of document.getElementsByTagName('px-tile')) {
    if (titleLower === tile.mainTitle.toLowerCase()) {
      return {
        valid: false,
        message: 'Package name is not unique'
      };
    }
  }

  // No exception conditions satisified. Return valid.
  return {
    valid: true
  };
}

function DropHandler(dropValue, tile) {
  const dropzone = tile.getElementsByTagName('px-chip-dropzone')[0];
  dropzone.addChip(dropValue);
}

window.addEventListener('px-tile-action-tapped', function(evt) {
  if (evt.detail.id === 'rename') {
    evt.target._showEditForm = true;
  } else if (evt.detail.id === 'remove') {
    evt.target.remove();
  }
});

window.addEventListener('px-chip-tapped', function(evt) {
  if (evt.detail.iconTapped) {
    if (evt.target.removeChip) {
      evt.target.removeChip(evt.detail.content);
    } else {
      evt.target.remove();
    }
  }
});
