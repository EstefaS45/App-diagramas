const categories = {
    strengths: [],
    opportunities: [],
    weaknesses: [],
    threats: []
};
function addElement() {
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;
    const input = document.getElementById('input');
    const element = input.value.trim();

    if (element) {
        categories[selectedCategory].push(element);
        updateDiagram();
        input.value = '';
    }
}
function resetDiagram() {
    Object.keys(categories).forEach(category => {
        categories[category] = [];
    });
    updateDiagram();
}
function updateDiagram() {
    Object.keys(categories).forEach(category => {
        const list = document.getElementById(`${category}-list`);
        list.innerHTML = '';

        categories[category].forEach(element => {
            const listItem = document.createElement('li');
            listItem.textContent = element;
            list.appendChild(listItem);
        });
    });
    
}