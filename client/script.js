document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const titleInput = document.getElementById('title');
    const eventList = document.getElementById('event-list');

    async function loadEvents() {
        try {
            const response = await fetch('/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const events = await response.json();
            renderEvents(events);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    function renderEvents(events) {
        eventList.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.title;
            eventList.appendChild(li);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        if (!title) {
            alert('Please enter an event title');
            return;
        }
        try {
            const response = await fetch('/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            if (!response.ok) throw new Error('Failed to add event');
            const newEvent = await response.json();
            const li = document.createElement('li');
            li.textContent = newEvent.title;
            eventList.appendChild(li);
            titleInput.value = '';
        } catch (error) {
            console.error('Error adding event:', error);
        }
    });

    loadEvents();
});
