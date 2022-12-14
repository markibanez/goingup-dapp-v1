import { useRef, useState, useEffect, useContext } from 'react';
import { WalletContext } from 'src/contexts/WalletContext';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';

import {
    Avatar,
    Box,
    Button,
    Divider,
    alpha,
    List,
    ListItem,
    ListItemText,
    Popover,
    styled,
    Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
//  import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import Identicon from '@/components/common/Identicon';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
    padding: ${theme.spacing(0, 1)};
    color: ${theme.colors.alpha.trueWhite[50]};
    background-color: ${theme.colors.alpha.white[10]};
    height: 48px;
    border-radius: ${theme.general.borderRadiusLg};

    .MuiSvgIcon-root {
      transition: ${theme.transitions.create(['color'])};
      font-size: ${theme.typography.pxToRem(24)};
      color: ${theme.colors.alpha.trueWhite[50]};
    }

    .MuiAvatar-root {
      border-radius: ${theme.general.borderRadiusLg};
      width: 34px;
      height: 34px;
    }

    &.Mui-active,
    &:hover {
      background-color: ${alpha(theme.colors.alpha.white[30], 0.2)};

      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.trueWhite[100]};
      }
    }

    .MuiButton-label {
      justify-content: flex-start;
    }
`
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${theme.palette.secondary.light};
`
);

const UserBoxDescriptionMain = styled(Typography)(
    ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[50]};
`
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`
);

const UserBoxLabelMain = styled(Typography)(
    ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    display: block;
    color: ${theme.colors.alpha.trueWhite[100]};
`
);

function Userbox() {
    const { t }: { t: any } = useTranslation();
    const { logout } = useAuth();
    const router = useRouter();

    const wallet = useContext(WalletContext);

    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        if (wallet.address === null) {
            wallet.connect();
        } else {
            setOpen(true);
        }
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleLogout = async (): Promise<void> => {
        try {
            handleClose();
            await logout();
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <UserBoxButton
                fullWidth
                color="secondary"
                ref={ref}
                onClick={handleOpen}
            >
                {wallet.address === null &&
                    <Avatar variant="rounded" />
                }

                {wallet.address !== null &&
                    <div style={{ paddingTop: '6px' }}>
                        <Identicon address={wallet.address} size={32} />
                    </div>
                }

                <Box
                    display="flex"
                    flex={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'inline-block', md: 'inline-block' },
                            width: { xs: '120px', md: 'auto'},
                            maxWidth: { xs: '350px' }
                        }}
                    >
                        <UserBoxText
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <UserBoxLabelMain variant="body1">
                                {wallet.address === null &&
                                    `Connect Wallet`
                                }

                                {wallet.address !== null && wallet.address}
                            </UserBoxLabelMain>
                            {wallet.address &&
                                <UserBoxDescriptionMain
                                    variant="body2"
                                >
                                    {wallet.walletTypes[wallet.walletType]?.display} {wallet.networks[wallet.network]?.name}
                                </UserBoxDescriptionMain>
                            }
                        </UserBoxText>
                    </Box>
                    <UnfoldMoreTwoToneIcon
                        fontSize="small"
                        sx={{
                            ml: 1
                        }}
                    />
                </Box>
            </UserBoxButton>
            <Popover
                disableScrollLock
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
            >
                {/* <MenuUserBox
                    sx={{
                        minWidth: 210
                    }}
                    display="flex"
                >
                    <Avatar
                        variant="rounded"
                        alt={user.name}
                        // src={user.avatar}
                    />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider
                    sx={{
                        mb: 0
                    }}
                /> */}
                <List
                    sx={{
                        p: 1
                    }}
                    component="nav"
                >
                    <ListItem
                        onClick={() => {
                            handleClose();
                            router.push(`/profile/${wallet.address}`)
                        }}
                        button
                    >
                        <AccountBoxTwoToneIcon fontSize="small" />
                        <ListItemText primary={t('Profile')} />
                    </ListItem>
                    {/* <ListItem
                        onClick={() => {
                            handleClose();
                        }}
                        button
                    >
                        <InboxTwoToneIcon fontSize="small" />
                        <ListItemText primary={t('Inbox')} />
                    </ListItem> */}
                    <ListItem
                        onClick={() => {
                            handleClose();
                            router.push(`/projects`);
                        }}
                        button
                    >
                        <WorkTwoToneIcon fontSize="small" />
                        <ListItemText primary={t('Projects')} />
                    </ListItem>
                </List>
                <Divider />
                <Box m={1}>
                    <Button color="primary" fullWidth onClick={() => { wallet.disconnect(); handleClose(); }}>
                        <LockOpenTwoToneIcon
                            sx={{
                                mr: 1
                            }}
                        />
                        {t('Disconnect this wallet')}
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default Userbox;
