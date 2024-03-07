export async function getAllNotes() {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    }
  );

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`, {
    method: "POST",
    headers: {
      Authorization:
        "bearer a4c08cfdcf0d331ad2d7b8cb3870992aa2edbff0825f591541f66148d5e5bb3820f2b40ef0040c2824c926870a5088ee81b5df563822e195946b6e590c269d24e6ef648c16486ab347042eae332bac7630a4ba07768bafa782f382d83c799c806208d7012d3598a28756783602ce0b7efa39209216092510532495f75de52b10",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization:
        "bearer a4c08cfdcf0d331ad2d7b8cb3870992aa2edbff0825f591541f66148d5e5bb3820f2b40ef0040c2824c926870a5088ee81b5df563822e195946b6e590c269d24e6ef648c16486ab347042eae332bac7630a4ba07768bafa782f382d83c799c806208d7012d3598a28756783602ce0b7efa39209216092510532495f75de52b10",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://127.0.0.1:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "bearer a4c08cfdcf0d331ad2d7b8cb3870992aa2edbff0825f591541f66148d5e5bb3820f2b40ef0040c2824c926870a5088ee81b5df563822e195946b6e590c269d24e6ef648c16486ab347042eae332bac7630a4ba07768bafa782f382d83c799c806208d7012d3598a28756783602ce0b7efa39209216092510532495f75de52b10",
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
}
