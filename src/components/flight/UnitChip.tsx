import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export enum UnitType {
    Distance,
    Speed,
    Altitude
}

const ConvertedValue = ({ value, type }: { value: number; type: UnitType }): React.ReactElement | null => {
    switch (type) {
        case UnitType.Distance:
            return (
                <List sx={{ padding: 0, margin: 0 }}>
                    <ListItem>
                        <ListItemText>{(value * 1.852).toFixed(0)} km</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>{(value * 1.151).toFixed(0)} mi</ListItemText>
                    </ListItem>
                </List>
            );
        case UnitType.Speed:
            return (
                <List sx={{ padding: 0, margin: 0 }}>
                    <ListItem>
                        <ListItemText>{(value * 1.852).toFixed(0)} km/h</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>{(value * 1.151).toFixed(0)} MpH</ListItemText>
                    </ListItem>
                </List>
            );
        case UnitType.Altitude:
            return (
                <List sx={{ padding: 0, margin: 0 }}>
                    <ListItem>
                        <ListItemText>{(value / 3.281).toFixed(0)} m</ListItemText>
                    </ListItem>
                </List>
            );
        default:
            return null;
    }
};

const UnitChip = ({ icon, label, value, type }: { icon: React.ReactElement; label: string; value: number; type: UnitType }): React.ReactElement => {
    return (
        <Tooltip title={<ConvertedValue value={value} type={type} />}>
            <Chip icon={icon} label={label} variant="outlined" color="primary" />
        </Tooltip>
    );
};

export default UnitChip;
