import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function Comment(props) {
  const { comment, onDelete, onUpdate } = props;
  const { comment_id, customer, content } = comment;
  const firstName = customer.first_name;
  const lastName = customer.last_name;
  const commentor = firstName + " " + lastName;

  const [isEditing, setIsEditing] = useState(false); //수정모드 여부 상태
  const [editContent, setEditContent] = useState(content); // 수정 내용 상태

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* 작성자 */}
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {commentor}
          </Typography>

          {/* 내용 영역 */}
          {isEditing ? (
            <TextareaAutosize
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              minRows={2}
              style={{ width: "100%" }}
            />
          ) : (
            <Typography variant="body2">{content}</Typography>
          )}

          {/* 버튼 영역 */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
            {isEditing ? (
              <>
                {/* 완료 버튼 */}
                <IconButton
                  color="primary"
                  onClick={() => {
                    onUpdate(comment_id, editContent); // 부모에서 API 호출
                    setIsEditing(false);
                  }}
                >
                  <CheckIcon />
                </IconButton>
                {/* 취소 버튼 */}
                <IconButton
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(content); // 원래 내용 복구
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
                {/* 수정 버튼 */}
                <IconButton color="primary" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                {/* 삭제 버튼 */}
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => onDelete(comment_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
