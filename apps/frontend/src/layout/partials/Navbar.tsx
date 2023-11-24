import {
    CircleIcon,
    CirclePlusIcon,
    CircleStackIcon,
    CursorIcon,
    DocumentIcon,
    HomeIcon,
    LogoutIcon,
    NewspaperIcon,
    PeopleIcon,
    QuestionIcon,
    SettingsIcon,
    SpeakerIcon,
} from "@/assets/images";
import { GlobalSpinner } from "@/components";
import { Dialog, DialogContent } from "@/components/Dialog";
import { useProjectCreateMutation } from "@/generated/graphql";
import useSession from "@/modules/users/hooks/useSession";
import { Button, TextInput } from "@/ui";
import { getAcronym } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Discord from "../../assets/images/navbar/Discord.png";
import {
    default as Frame,
    default as Profile,
} from "../../assets/images/navbar/Frame.png";

export const Navbar = () => {
    const navItems = [
        {
            id: 1,
            title: "Home",
            icon: <HomeIcon />,
        },
        {
            id: 2,
            title: "Surveys",
            icon: <DocumentIcon />,
        },
        {
            id: 3,
            title: "Events",
            icon: <CursorIcon />,
        },
        {
            id: 4,
            title: "Audience",
            icon: <PeopleIcon />,
        },
    ];
    const projects = [
        {
            id: 97,
            name: "Project1",
        },
        {
            id: 97,
            name: "Project1",
        },
    ];

    const workspaces = [
        {
            id: 1,
            name: "Workspace 1",
        },
        {
            id: 1,
            name: "Workspace 1",
        },
    ];

    const bottomNav = [
        {
            id: 1,
            title: "Invite team",
            icon: <CirclePlusIcon />,
        },
        {
            id: 2,
            title: "Feedbacks",
            icon: <SpeakerIcon />,
        },
        {
            id: 3,
            title: "Help and doc",
            icon: <QuestionIcon />,
        },
    ];
    // const navigate = useNavigate();
    const [projectCreate, { loading }] = useProjectCreateMutation();
    const { session } = useSession();

    const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
    const [projectName, setProjectName] = useState<string>("");
    const [projectNameError, setProjectNameError] = useState("");

    const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!projectName) {
            setProjectNameError("Field cannot be empty");
            return;
        }
        if (projectName.split("").length <= 2) {
            setProjectNameError("Minimum length of project is 3");
            return;
        }

        const result = await projectCreate({
            variables: {
                input: { name: projectName },
            },
            context: {
                headers: {
                    Project: session?.project?.id,
                },
            },
        });

        if (result.data?.projectCreate) {
            // updateSession({ project: result.data.projectCreate.project });
            setOpenCreateProjectModal(false);
        }
    };
    // useEffect(() => {
    //     handleRedirect(session, navigate);
    // }, [session]);

    useEffect(() => {
        if (openCreateProjectModal === false) {
            setProjectName("");
            setProjectNameError("");
        }
    }, [openCreateProjectModal]);

    if (loading) {
        return <GlobalSpinner />;
    }

    return (
        <div
            className="w-[240px] border-r border-intg-bg-4 bg-intg-black p-6"
            style={{
                backgroundImage:
                    "radial-gradient(rgba(28, 15, 89, 0.30) 50%, rgba(5, 5, 5, 0.30))",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="mb-9 space-y-2">
                <p className="text-xs text-intg-text-4">Project</p>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="outline-none">
                        <p className="flex w-[177px] items-center text-intg-text-4">
                            <span className="mr-3 rounded bg-gradient-button px-1.5 uppercase">
                                {getAcronym(session?.project?.name as string)}
                            </span>
                            <span className="capitalize">
                                {session?.project?.name}
                            </span>
                            <span className="ml-auto">
                                <ChevronDown size={16} />
                            </span>
                        </p>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="start"
                            alignOffset={50}
                            className="border-intg-bg-10  w-[221px] rounded border bg-intg-bg-9 p-2 text-white"
                        >
                            <DropdownMenu.Group>
                                {projects.map((item) => {
                                    return (
                                        <DropdownMenu.Item
                                            className="hover:bg-intg-bg-10 flex cursor-pointer rounded p-2"
                                            onClick={() => {}}
                                        >
                                            <span className="mr-3 rounded bg-gradient-button px-1.5">
                                                IF
                                            </span>
                                            <span>{item.name}</span>
                                        </DropdownMenu.Item>
                                    );
                                })}
                            </DropdownMenu.Group>

                            <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                            <DropdownMenu.Group>
                                <DropdownMenu.Item className="flex cursor-pointer items-center space-x-2 px-3 py-2">
                                    <span>
                                        <SettingsIcon />
                                    </span>
                                    <span>Project Settings</span>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item>
                                    <Button
                                        icon={<CirclePlusIcon />}
                                        variant="custom"
                                        text="New Project"
                                        size="md"
                                        className="bg-intg-bg-11"
                                        onClick={() =>
                                            setOpenCreateProjectModal(true)
                                        }
                                    />
                                </DropdownMenu.Item>
                            </DropdownMenu.Group>
                            <DropdownMenu.CheckboxItem>
                                <DropdownMenu.ItemIndicator />
                            </DropdownMenu.CheckboxItem>

                            <DropdownMenu.Separator />
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
            <Dialog
                open={openCreateProjectModal}
                onOpenChange={(value) => setOpenCreateProjectModal(value)}
            >
                <DialogContent title="Create new survey">
                    <div className="mt-6 w-[34rem]">
                        <form onSubmit={handleCreateProject}>
                            <TextInput
                                label="Project Name"
                                placeholder="Project name"
                                value={projectName}
                                onChange={(e) => {
                                    setProjectName(e.target.value);
                                    setProjectNameError("");
                                }}
                                error={!!projectNameError}
                                errorMessage={projectNameError}
                            />
                            <div className="my-6">
                                <hr className="border-intg-bg-4" />
                            </div>
                            <div className="w-full">
                                <Button
                                    text="Create Project"
                                    className="w-full px-8 py-4"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mb-[14px] space-y-[27px]">
                <button className="flex items-center justify-between space-x-2 rounded border border-intg-bg-4 bg-intg-bg-9 p-3 text-sm text-intg-text-4">
                    <span>
                        <DocumentIcon />
                    </span>
                    <span>Create new survey</span>
                </button>
                <button className="flex w-[177px]  items-center  space-x-2 rounded bg-intg-bg-8 px-3 py-2 text-sm text-intg-text-4">
                    <span>
                        <CircleIcon />
                    </span>
                    <span>Get started</span>
                </button>
            </div>

            <hr className="border-intg-bg-4" />

            <ul className="my-4 space-y-2 text-sm text-intg-text-4">
                {navItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="flex items-center space-x-2 px-3 py-2"
                        >
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <hr className="border-intg-bg-4" />
            <ul className="my-4 space-y-2 text-sm text-intg-text-4">
                {bottomNav.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="flex items-center space-x-2 px-3 py-2"
                        >
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="flex w-full space-x-2 rounded-lg bg-intg-bg-9 px-2 py-4">
                <div className="h-8 w-8">
                    <img src={Discord} alt="Discord" />
                </div>
                <div className="space-y-[4px]">
                    <p className="flex">
                        <span className="text-sm text-white">
                            Join our Discord Community
                        </span>
                    </p>
                    <p className="text-xs text-intg-text">
                        Add your card to prevent interruption after trial
                    </p>
                    <Button text="Join now" className="py-[6px]" />
                </div>
            </div>
            <div className="my-4">
                <hr className="border-intg-bg-4" />
            </div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex w-full items-center text-intg-text outline-none">
                    <div className="flex items-center space-x-2">
                        <img
                            src={Frame}
                            alt="picture frame"
                            className="rounded object-contain"
                        />
                        <span>Profile</span>
                    </div>
                    <span className="ml-auto">
                        <ChevronDown size={16} />
                    </span>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align="start"
                        alignOffset={50}
                        className="border-intg-bg-10 w-[310px] rounded border-[0.5px] bg-intg-bg-9 px-2 py-3 text-intg-text"
                    >
                        <DropdownMenu.Label className="pb-1">
                            <p className="text-xs">SIGNED IN AS USER</p>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <div className="flex items-center justify-between px-2 py-[6px]">
                                <div className="flex space-x-2">
                                    <img
                                        src={Profile}
                                        alt="user avatar"
                                        className="rounded object-contain"
                                    />
                                    <div>
                                        <p className="text-intg-text-7 text-sm">
                                            User name
                                        </p>
                                        <p className="text-sm">
                                            user@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <SettingsIcon />
                                </div>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                        <DropdownMenu.Sub>
                            <DropdownMenu.Label>
                                <p className="text-xs">CURRENT WORKSPACE</p>
                            </DropdownMenu.Label>
                            <DropdownMenu.SubTrigger className="my-3 flex justify-between px-3 py-2">
                                <div className="flex items-center space-x-2">
                                    <span className="rounded bg-gradient-button px-1.5">
                                        IF
                                    </span>
                                    <span>SOBTECH</span>
                                </div>
                                <ChevronRight />
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                            <DropdownMenu.Portal>
                                <DropdownMenu.SubContent className="ml-4 w-[221px] rounded bg-intg-bg-9 px-2 py-4 text-intg-text">
                                    <DropdownMenu.Label>
                                        <p className="mb-2 text-xs">
                                            OTHER WORKSPACES
                                        </p>
                                    </DropdownMenu.Label>

                                    {workspaces.map((item) => {
                                        return (
                                            <>
                                                <DropdownMenu.Item className="px-3 py-2">
                                                    {item.name}
                                                </DropdownMenu.Item>
                                            </>
                                        );
                                    })}
                                    <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                                    <DropdownMenu.Item className="px-3 py-2">
                                        <Button
                                            icon={<CirclePlusIcon />}
                                            variant="custom"
                                            text="New Workspace"
                                            size="md"
                                            className="bg-intg-bg-11 w-full"
                                        />
                                    </DropdownMenu.Item>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 ">
                            <SettingsIcon />
                            <p>Workspace Settings</p>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                        <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2">
                            <NewspaperIcon />
                            <p>Billing</p>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2">
                            <CircleStackIcon />
                            <p>Status Page</p>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2">
                            <QuestionIcon />
                            <p>Help and doc</p>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-3 border-[.5px] border-intg-bg-4" />
                        <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2">
                            <LogoutIcon />
                            <p>Log out</p>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};
