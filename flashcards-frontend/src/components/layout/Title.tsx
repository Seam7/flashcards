import { Link } from "react-router";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export const Title = ({ link, title }: { link: string; title: string }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Link to={link} style={{ height: "35px" }}>
        <ArrowCircleLeftIcon fontSize="large" />
      </Link>
      <h1 style={{ fontSize: "36px" }}>{title}</h1>
    </div>
  );
};
