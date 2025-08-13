import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Comment(props) {
  const { comment, onDelete } = props;
  const { comment_id, customer, content } = comment;
  const firstName = customer.first_name;
  const lastName = customer.last_name;
  const commentor = firstName + " " + lastName;

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {commentor}
            </Typography>
            <Typography variant="body2">{content}</Typography>
          </Box>

          {/* 삭제 버튼 */}
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => onDelete(comment_id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
}
