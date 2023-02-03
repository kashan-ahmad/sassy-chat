import { logout } from "./server";
import useToggle from "./useToggle";
import { useSnackbar } from "notistack";

// Components.
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import ListItemIcon from "@mui/material/ListItemIcon";

// Icons.
import Info from "@mui/icons-material/Info";
import { ArrowBack } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import MoreVert from "@mui/icons-material/MoreVert";
import { Channel } from "./types";

export default function ChannelHeader({
  channel,
  onDeSelectChannel,
}: {
  channel: Channel,
  onDeSelectChannel: Function;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, handleClick, handleClose, anchorEl } = useToggle();

  return (
    <CardHeader
    title={channel.label}
      avatar={
        <IconButton onClick={() => onDeSelectChannel()}>
          <ArrowBack />
        </IconButton>
      }
      action={
        <>
          <IconButton onClick={handleClick} aria-label="Options">
            <MoreVert />
          </IconButton>
          <Menu
            open={isOpen}
            id="account-menu"
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <Info fontSize="small" />
              </ListItemIcon>
              About
            </MenuItem>
            <MenuItem
              onClick={() =>
                window.confirm("Are you sure you want to log out?") &&
                logout({
                  onFailure: (message) =>
                    enqueueSnackbar(message, { type: "error" }),
                })
              }
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      }
    />
  );
}
