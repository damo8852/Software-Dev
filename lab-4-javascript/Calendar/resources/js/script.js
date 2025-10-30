const CALENDAR_EVENTS = [
  {
    name: 'Running',
    day: 'wednesday',
    time: '09:00',
    modality: 'In-person',
    location: 'Boulder',
    url: '',
    attendees: 'Alice, Jack, Ben',
  },
];

const CALENDAR_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let EVENT_MODAL;

/********************** PART B: 6.1: CREATE CALENDAR *************************/

function createBootstrapCard(day) {
  // @TODO: Use `document.createElement()` function to create a `div`
  var card = document.createElement('div');
    // Let's add some bootstrap classes to the div to upgrade its appearance
    // This is the equivalent of <div class="col-sm m-1 bg-white rounded px-1 px-md-2"> in HTML
    card.className = 'col-sm m-1 bg-white rounded px-1 px-md-2';
  // This the equivalent of <div id="monday"> in HTML
  card.id = day.toLowerCase();
  return card;
}

function createTitle(day) {
  const title = document.createElement('div');
  title.className = 'h6 text-center position-relative py-2';
  title.innerHTML = day;
  return title;
}

function createEventIcon(card) {
  const icon = document.createElement('i');
  icon.className = 'bi bi-calendar-plus btn position-absolute translate-middle start-100  rounded p-0 btn-link';
  // adding an event listener to the click event of the icon to open the modal
  // the below line of code would be the equivalent of:
  // <i onclick="openEventModal({day: 'monday'})"> in HTML.
  icon.setAttribute('onclick', `openEventModal({day: ${card.id}})`);
  return icon;
}

function createEventDiv() {
  const eventsDiv = document.createElement('div');
  // We are adding a class for this container to able to call it when we're populating the days
  // with the events
  eventsDiv.classList.add('event-container');
return eventsDiv;
}

function initializeCalendar() {
  
  // Step 1: Initialize the modal (No changes required here).
  initializeEventModal();

  // @TODO: Step 2: Select the calendar div element by its id. Replace '...' with the correct code to get the div.
  // Hint: Use either `document.getElementById('id')` or `document.querySelector('#id')` to find the element.
  const calendarElement = document.getElementById('calendar');
  // Step 3: Loop through each day in the CALENDAR_DAYS array(No changes required here).
  // This array contains the days of the week (e.g., 'Monday', 'Tuesday', etc.).
  CALENDAR_DAYS.forEach(day => {
    // @TODO: Step 4: Uncomment the following line and complete the function call createBootstrapCard(day) function
    var card = createBootstrapCard(day);
    // @TODO: Step 5: Filling below lines and add the created card to the calendar element using appendChild().
    calendarElement.appendChild(card);

    var title = createTitle(day);

    card.appendChild(title);

    var icon = createEventIcon(card);

    title.appendChild(icon);

    var eventsDiv = createEventDiv();

    card.appendChild(eventsDiv);
    console.log(card);
    });
  // @TODO: Step 13: Uncomment this after you implement the updateDOM() function
  updateDOM();
}

/********************** PART B: 6.2: CREATE MODAL ****************************/

function initializeEventModal() {
    // @TODO: Create a modal using JS. The id will be `event-modal`:
  // Reference: https://getbootstrap.com/docs/5.3/components/modal/#via-javascript
  EVENT_MODAL = new bootstrap.Modal(document.getElementById('event-modal'));
}
function openEventModal({ id = null, day }) {
  const submit_button = document.querySelector("#submit_button");
  const modal_title = document.querySelector(".modal-title");


  let event = CALENDAR_EVENTS[id];

  if (!event) {
    event = {
      name: "",
      day: day,
      time: "",
      modality: "in-person",
      location: "",
      url: "",
      attendees: "",
    };

    modal_title.innerHTML = "Create Event";
    submit_button.innerHTML = "Create Event";
    id = CALENDAR_EVENTS.length; 
  } else {
    modal_title.innerHTML = "Update Event";
    submit_button.innerHTML = "Update Event";
  }

  
  document.querySelector("#event_name").value = event.name;
  document.querySelector("#event_weekday").value = event.day;
  document.querySelector("#event_time").value = event.time;
  document.querySelector("#event_modality").value = event.modality;

  if (event.modality === "in-person") {
    document.querySelector("#event_location").value = event.location;
    document.querySelector("#event_attendees").value = event.attendees;
  } else if (event.modality === "remote") {
    document.querySelector("#event_remote_url").value = event.url;
  }

  updateLocationOptions(event.modality);

  const form = document.querySelector("#eventForm");
  form.onsubmit = function() {
    updateEventFromModal(id);
    return false; 
  };

  EVENT_MODAL.show();
}



function updateEventFromModal(id) {
  const eventModality = document.querySelector("#event_modality").value;

  CALENDAR_EVENTS[id] = {
    name: document.querySelector('#event_name').value, 
    day: document.querySelector('#event_weekday').value, 
    time: document.querySelector('#event_time').value, 
    modality: eventModality, 
    location: eventModality === 'in-person' 
      ? document.querySelector('#event_location').value 
      : '', 
    url: eventModality === 'remote' 
      ? document.querySelector('#event_remote_url').value 
      : '', 
    attendees: eventModality === 'in-person' 
      ? document.querySelector('#event_attendees').value 
      : '' 
  };

  
  updateDOM();

  
  EVENT_MODAL.hide();
}


function updateLocationOptions() {
  var modality = document.getElementById('event_modality').value; // Correct ID
  var locationField = document.getElementById('location_field');
  var remoteUrlField = document.getElementById('remote_url_field');
  var attendeesField = document.getElementById('attendees_field');

  if (modality === 'in-person') {
    locationField.classList.remove('hidden');
    attendeesField.classList.remove('hidden');
    remoteUrlField.classList.add('hidden');
  } else if (modality === 'remote') {
    remoteUrlField.classList.remove('hidden');
    locationField.classList.add('hidden');
    attendeesField.classList.add('hidden');
  }
}


/********************** PART B: 6.3: UPDATE DOM ******************************/
// DOUBLE CHECK ***************************************************************************************
function createEventElement(id) {
  var eventElement = document.createElement('div');

  eventElement.classList = "event row border rounded m-1 py-1";

  eventElement.id = `event-${id}`;

  return eventElement;
}

function createTitleForEvent(event) {
  var title = document.createElement('div');
  title.classList.add('col', 'event-title');
  title.innerHTML = event.name;
  return title;
}

function updateDOM() {
  const events = CALENDAR_EVENTS;
  
  events.forEach((event, id) => {
    let eventElement = document.querySelector(`#event-${id}`);

    if (eventElement === null) {
      eventElement = createEventElement(id);
      const title = createTitleForEvent(event); 
      eventElement.appendChild(title); 
    } else {
      eventElement.remove();
      eventElement = createEventElement(id);
      const title = createTitleForEvent(event);
      eventElement.appendChild(title); 
    }

    const titleDiv = eventElement.querySelector('div.event-title');
    titleDiv.innerHTML = event.name;

    eventElement.setAttribute('title', `Time: ${event.time}\nLocation: ${event.modality === 'In-person' ? event.location : event.url}`);

    eventElement.setAttribute('onclick', `openEventModal({id: ${id}, day: '${event.day}'})`);

    document
      .querySelector(`#${event.day.toLowerCase()} .event-container`)
      .appendChild(eventElement);
  });

  // Optional: Update tooltips if tooltips are implemented elsewhere.
  updateTooltips(); // This function will handle tooltips display (define in script.js).
}


/********************** PART C: 1. Display Tooltip ***************************/

function updateTooltips() {
  const eventElements = document.querySelectorAll('.event');

  eventElements.forEach((eventElement, index) => {
    const event = CALENDAR_EVENTS[index];

    const tooltipContent = `
      <strong>${event.name}</strong><br>
      Time: ${event.time}<br>
      ${event.modality === 'in-person' ? `Location: ${event.location}` : `URL: ${event.url}`}
    `;

    eventElement.setAttribute('title', tooltipContent);

    new bootstrap.Tooltip(eventElement, {
      html: true, 
      placement: 'top', 
    });
  });
}

