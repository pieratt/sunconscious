document.getElementById('wisdomForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        excerpt: document.getElementById('excerpt').value,
        sourceName: document.getElementById('sourceName').value,
        sourceUrl: document.getElementById('sourceUrl').value,
        author1Name: document.getElementById('author1Name').value,
        author2Name: document.getElementById('author2Name').value,
        username: document.getElementById('username').value,
        areas: Array.from(document.getElementById('areas').selectedOptions).map(option => option.value),
        type: document.getElementById('type').value,
        era: document.getElementById('era').value,
    };

    // Building the string representation of the object
    const output = `{
  id: "1",
  excerpt: "${formData.excerpt}",
  attribution: {
    source: {
      id: "1",
      name: "${formData.sourceName}",
      url: "${formData.sourceUrl}"
    },
    authors: [
      {
        id: "1",
        name: "${formData.author1Name}"
      },
      {
        id: "2",
        name: "${formData.author2Name}"
      }
    ]
  },
  addedBy: {
    id: "1",
    username: "${formData.username}"
  },
  addedAt: "${new Date().toISOString().split('T')[0]}",
  areas: [${formData.areas.map(area => `"${area}"`).join(', ')}],
  type: "${formData.type}",
  era: "${formData.era}",
},`;

    console.log(output);
});
