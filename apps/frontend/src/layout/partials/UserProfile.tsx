import { useWorkspace } from "@/modules/workspace/hooks/useWorkspace";
import { AcronymBox, Button, NavItem } from "@/ui";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/ui/Dropdown/DropdownMenu";
import { CheckCircleIcon, CirclePlusIcon, LogoutIcon, NewspaperIcon, SettingsIcon } from "@/ui/icons";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthOrganization, Project } from "@/generated/graphql";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { convertToAuthOrganization } from "@/modules/auth/states/user";
import { ROUTES } from "@/routes";
import Frame from "assets/images/Frame.png";

const profileNavItems = [
    {
        id: 1,
        title: "Billing",
        icon: <NewspaperIcon />,
        href: ROUTES.BILLING,
    },
    // {
    //     id: 2,
    //     title: "Status Page",
    //     icon: <CircleStackIcon />,
    // },
    // {
    //     id: 3,
    //     title: "Help and doc",
    //     icon: <QuestionIcon />,
    // },
];

export const UserProfile = () => {
    const { user, organizations, logout, switchWorkspace } = useAuth();
    const { workspace } = useWorkspace();
    const navigate = useNavigate();
    const { orgSlug, projectSlug } = useParams();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center text-intg-text outline-none">
                <div className="flex items-center gap-2">
                    <img src={Frame} alt="picture frame" className="h-[31px] w-[31px] rounded object-contain" />
                    <span className="text-sm">Profile</span>
                </div>
                <span className="ml-auto">
                    <ChevronDown size={16} />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                alignOffset={50}
                className="w-[310px] rounded border-[0.5px] border-intg-bg-10 bg-intg-bg-9 px-2 py-3 text-intg-text"
            >
                <DropdownMenuLabel className="pb-1">
                    <p className="text-xs">SIGNED IN AS USER</p>
                </DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() =>
                        navigate(
                            `${ROUTES.WORKSPACE_SETTINGS_PROFILE}`
                                .replace(":orgSlug", orgSlug!)
                                .replace(":projectSlug", projectSlug!),
                        )
                    }
                    className="cursor-pointer"
                >
                    <div className="flex items-center justify-between px-2 py-[6px]">
                        <div className="flex items-center gap-2">
                            <img src={Frame} alt="user avatar" className="h-[31px] w-[31px] rounded object-contain" />
                            <div>
                                <p className="text-sm text-intg-text-7">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <div>
                            <SettingsIcon />
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-3 border-[.5px] border-intg-bg-4" />
                <DropdownMenuSub>
                    <DropdownMenuLabel>
                        <p className="text-xs">CURRENT WORKSPACE</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSubTrigger>
                        <NavItem
                            uppercase={true}
                            text={workspace?.name}
                            leftIcon={<AcronymBox text={workspace?.name as string} />}
                            rightIcon={<CheckCircleIcon />}
                            classnames="px-3 py-2 my-3 uppercase"
                        />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSeparator className="my-3 border-[.5px] border-intg-bg-4" />
                    <DropdownMenuSubContent className="ml-4 max-h-[510px] min-w-[250px] overflow-y-scroll rounded bg-intg-bg-9 px-2 py-4 text-intg-text">
                        <DropdownMenuLabel>
                            <p className="mb-2 text-xs">OTHER WORKSPACES</p>
                        </DropdownMenuLabel>
                        {organizations?.map((item) => {
                            return (
                                <DropdownMenuItem
                                    className="px-3 py-2 hover:rounded-md hover:bg-intg-bg-11"
                                    key={item?.id}
                                    onClick={() => {
                                        switchWorkspace(
                                            convertToAuthOrganization(item) as AuthOrganization,
                                            item?.projects?.edges![0]?.node as Project,
                                        );
                                    }}
                                >
                                    <NavItem
                                        classnames="p-0"
                                        text={item?.name}
                                        leftIcon={<AcronymBox text={item?.name ?? ""} />}
                                    />
                                </DropdownMenuItem>
                            );
                        })}
                        <DropdownMenuSeparator className="my-3 border-[.5px] border-intg-bg-4" />
                        <DropdownMenuItem>
                            <a href="/create-workspace">
                                <Button
                                    icon={<CirclePlusIcon />}
                                    variant="custom"
                                    text="New Workspace"
                                    className="bg-intg-bg-11 text-sm"
                                />
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem
                    className="flex items-center gap-2 px-3 py-2"
                    onClick={() =>
                        navigate(
                            `${ROUTES.WORKSPACE_SETTINGS}`
                                .replace(":orgSlug", orgSlug!)
                                .replace(":projectSlug", projectSlug!),
                        )
                    }
                >
                    <SettingsIcon />
                    <p className="cursor-pointer text-sm">Workspace Settings</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-3 border-[.5px] border-intg-bg-4" />
                {profileNavItems.map((item) => {
                    return (
                        <DropdownMenuItem key={item.id}>
                            <NavItem
                                onclick={() =>
                                    navigate(
                                        item.href.replace(":orgSlug", orgSlug!).replace(":projectSlug", projectSlug!),
                                    )
                                }
                                text={item.title}
                                leftIcon={item.icon}
                                classnames="px-3 py-2 text-sm text-intg-text"
                            />
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator className="my-3 border-[.5px] border-intg-bg-4" />
                <DropdownMenuItem className="flex cursor-pointer items-center gap-2 px-3 py-2" onClick={logout}>
                    <LogoutIcon />
                    <p className="text-sm text-intg-error-text">Log out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
