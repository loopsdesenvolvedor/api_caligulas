import cors from "cors";

const PORT = process.env.PORT;
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
