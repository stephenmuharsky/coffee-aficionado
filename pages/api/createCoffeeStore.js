import { getMinifiedRecords, table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  console.log({ req });
  //findind a record
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          //create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json({ message: "create a record", records });
          } else {
            res.status(400);
            res.json({ message: "Name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.error("Error creating or finding store", err);
      res.status(500);
      res.json({ message: "Error creating or finding store", err });
    }
  }
};
export default createCoffeeStore;