const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString()
}
const createRows = () => {
  const rows = []
  for (let i = 1; i < 100; i++) {
    rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][
        Math.floor(Math.random() * 3 + 1)
      ],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][
        Math.floor(Math.random() * 3 + 1)
      ],
      startDate: getRandomDate(new Date(2015, 3, 1), new Date()),
      completeDate: getRandomDate(new Date(), new Date(2016, 0, 1)),
      children: [
        {
          id: 'row' + i + '-0',
          name: 'supplier ' + i,
          format: '728x90',
          position: 'run of site',
          price: 300
        },
        {
          id: 'row' + i + '-1',
          name: 'supplier ' + i,
          format: '480x600',
          position: 'run of site',
          price: 300 * 0.25
        },
        {
          id: 'row' + i + '-2',
          name: 'supplier ' + i,
          format: '328x70',
          position: 'run of site',
          price: 300 * 0.25
        }
      ]
    })
  }

  return rows
}
export default createRows
