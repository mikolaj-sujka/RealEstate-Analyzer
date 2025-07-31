import React from "react";
import { Menu, Button } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { RowActionType } from "../../models";

type Props<Row = any> = {
  row: Row;
  onRowAction: (action: RowActionType, row: Row) => void;
}

export const RowActionsMenu = <Row,>({ row, onRowAction }: Props<Row>) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" size="xs">
          <IconDots size={16} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onRowAction("details", row)}>
          View Details
        </Menu.Item>
        <Menu.Item onClick={() => onRowAction("edit", row)}>Edit</Menu.Item>
        <Menu.Item color="red" onClick={() => onRowAction("delete", row)}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
