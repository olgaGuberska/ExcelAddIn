const dataExample = [
    {
      id: "12324",
      name: "Poland",
      expanded: true,
      subChild: [
        { id: "123545", name: "WAR-MAZ", subChild: [{ id: "456123", name: "Elk" }] },
        {
          id: "01-02",
          name: "PODLASKIE",
          subChild: [
            { id: "01-02-01", name: "Bialystok" },
            { id: "01-02-02", name: "Suwalki" },
          ],
        },
        {
          id: "01-03",
          name: "MAZOWIECKIE",
          subChild: [
            { id: "01-03-01", name: "Warszawa", tooltip: "tooltip z tooltipa" },
            { id: "01-03-02", name: "WilGrodzisk Mazowiecki" },
          ],
        },
      ],
    },
    {
      id: "02",
      name: "Germany",
      subChild: [
        { id: "02-01", name: "Westfalia", subChild: [{ id: "02-01-01", name: "Oelde" }] },
        {
          id: "02-02",
          name: "BerlinAround",
          subChild: [
            { id: "02-02-01", name: "Berlin" },
            { id: "02-02-02", name: "Other city" },
          ],
        },
      ],
    },
    {
      id: "03",
      name: "COsta Rica",
      subChild: [
        {
          id: "03-01",
          name: "Puntarenas",
          subChild: [
            { id: "03-01-01", name: "Berhel" },
            { id: "03-01-02", name: "Berhel2" },
          ],
        },
        { id: "03-02", name: "San Jose", subChild: [{ id: "03-02-01", name: "Atenas" }] },
        { id: "03-03", name: "Global Warming.ppt" },
        { id: "03-04", name: "Social Network.pdf" },
        { id: "03-05", name: "Youth Empowerment.pdf" },
        { id: "03-06", name: "San Jose", subChild: [{ id: "03-06-01", name: "Atenas" }] },
        { id: "03-07", name: "Global Warming.ppt" },
        { id: "03-08", name: "Social Network.pdf" },
        { id: "03-09", name: "Youth Empowerment.pdf" },
        { id: "03-10", name: "San Jose", subChild: [{ id: "03-10-01", name: "Atenas" }] },
        { id: "03-11", name: "Global Warming.ppt" },
        { id: "03-12", name: "Social Network.pdf" },
        { id: "03-13", name: "Youth Empowerment.pdf" },
        { id: "03-14", name: "San Jose", subChild: [{ id: "03-14-01", name: "Atenas" }] },
        { id: "03-15", name: "Global Warming.ppt" },
        { id: "03-16", name: "Social Network.pdf" },
        { id: "03-17", name: "Youth Empowerment.pdf" },
        { id: "03-18", name: "San Jose", subChild: [{ id: "03-18-01", name: "Atenas" }] },
        { id: "03-19", name: "Global Warming.ppt" },
        { id: "03-20", name: "Social Network.pdf" },
        { id: "03-21", name: "Youth Empowerment.pdf" }
      ],
    },
  ];
module.exports = {dataExample: dataExample}
 