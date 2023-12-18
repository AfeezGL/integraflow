import { SurveyStatusEnum } from "@/generated/graphql";
import { ROUTES } from "@/routes";
import { Dialog, DialogContent, DialogTrigger } from "@/ui";
import * as Popover from "@radix-ui/react-popover";
import {
    Icon,
    Table,
    TableBody,
    TableCell,
    TableFoot,
    TableFooterCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from "@tremor/react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
    Archive,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Edit,
    MoreHorizontal,
    Radio,
    Trash2,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSurveyList } from "../../../hooks/useSurveyList";
import SurveyCreate from "../../SurveyCreate";
import CreateSurveyButton from "../../partials/CreateSurveyButton";
import { StatusBadge } from "./StatusBadge";

interface SurveyListData {
    surveys: {
        id: string;
        slug: string;
        name: string;
        createdAt: string;
        creator: {
            email: string;
            fullName: string;
        };
        status: SurveyStatusEnum;
    }[];
}

const headers = [
    { id: crypto.randomUUID(), title: "Name" },
    { id: crypto.randomUUID(), title: "Status" },
    { id: crypto.randomUUID(), title: "Creator" },
    { id: crypto.randomUUID(), title: "Date Created" },
    { id: crypto.randomUUID(), title: "Responses" },
    { id: crypto.randomUUID(), title: "" },
];

export const SurveyList = () => {
    const navigate = useNavigate();
    const { orgSlug, projectSlug } = useParams();
    const [page, setPage] = React.useState<number>(1);

    const {
        getMoreSurveys,
        surveyList,
        totalSurveys,
        surveysOnPage,
        pageInfo,
    } = useSurveyList();
    // const [nameFilter, setNameFilter] = React.useState<string>("");
    const [currentSurveys, setCurrentSurveys] = React.useState<
        SurveyListData["surveys"]
    >(surveyList || []);

    React.useEffect(() => {
        setCurrentSurveys(surveyList ?? []);
    }, [surveyList]);

    const handleGetMoreSurveys = (direction: string) => {
        if (direction === "forward") {
            setPage((prevPage) => prevPage + 1);
        } else {
            setPage((prevPage) => prevPage - 1);
        }

        getMoreSurveys(direction);
        setCurrentSurveys(surveyList || []);
    };

    const handleGetSurvey = (slug: string) => {
        navigate(
            ROUTES.STUDIO.replace(":orgSlug", orgSlug!)
                .replace(":projectSlug", projectSlug!)
                .replace(":surveySlug", slug),
        );
    };

    // const getSurveyId = (id: string) => {

    // }

    const surveyStartIndex = (page - 1) * surveysOnPage + 1;
    const surveyEndIndex = Math.min(
        page * surveysOnPage,
        totalSurveys as number,
    );

    return (
        <div className="h-full w-full px-6 py-4 text-white">
            <div className="flex justify-between">
                <p className="py-2 text-xl font-normal">Surveys</p>

                <Dialog>
                    <DialogTrigger asChild>
                        <div>
                            <CreateSurveyButton />
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        title="Create new survey"
                        description="Pick a method that suits you best"
                    >
                        <SurveyCreate className="h-[357px] w-[762px] pt-8" />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mb-4 mt-8 flex justify-between">
                <input
                    type="text"
                    placeholder="Filter surveys by name"
                    // onChange={(e) => setNameFilter(e.target.value)}
                    className="h-[40px] w-[300px] text-ellipsis rounded-md border border-intg-bg-7 bg-transparent px-4 outline-none placeholder:text-intg-text-4"
                />
            </div>

            <div className="mt-8  flex flex-col">
                <Table className="scrollbar-hide table-auto rounded-md border border-intg-bg-7 ">
                    <TableHead className="border-b border-intg-bg-7 bg-intg-bg-8 font-light hover:cursor-pointer">
                        <TableRow>
                            {headers.map(({ title, id }) => {
                                return (
                                    <TableHeaderCell
                                        className="text-md font-normal"
                                        key={id}
                                    >
                                        {title}
                                    </TableHeaderCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {currentSurveys?.map((survey) => {
                            return (
                                <TableRow
                                    key={survey.id}
                                    onClick={() => handleGetSurvey(survey.slug)}
                                    className="border-intg-bg-7 text-center font-light transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-8"
                                >
                                    <TableCell>{survey.name}</TableCell>
                                    <TableCell>
                                        <StatusBadge survey={survey} />
                                    </TableCell>
                                    <TableCell>
                                        {survey?.creator?.fullName}
                                        <br />
                                        <span className="text-[12px] text-intg-text-4">
                                            {survey?.creator.email}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="first-letter:capitalize">
                                            {formatDistanceToNow(
                                                parseISO(survey.createdAt),
                                                {
                                                    addSuffix: true,
                                                },
                                            )}
                                        </span>
                                        <br />
                                        <span className="text-[12px] text-intg-text-4">
                                            {format(
                                                new Date(survey.createdAt),
                                                "MMM dd, yyyy",
                                            )}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-12">0</TableCell>
                                    <TableCell className="text-center">
                                        <Popover.Root>
                                            <Popover.Trigger asChild>
                                                <button
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    className="w-fit rounded-md px-1 py-1 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 data-[state=a]:bg-intg-bg-1"
                                                >
                                                    <MoreHorizontal color="#AFAAC7" />
                                                </button>
                                            </Popover.Trigger>

                                            <Popover.Portal>
                                                <Popover.Content
                                                    align="end"
                                                    alignOffset={5}
                                                    className="w-[140px] rounded-md border border-intg-bg-7 bg-intg-bg-8 px-3 py-4 uppercase"
                                                >
                                                    <div className="flex gap-[6px] rounded-md py-[7px] text-sm font-normal text-intg-text-4 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 hover:pl-[8px]">
                                                        <Trash2
                                                            size="18"
                                                            color="#AFAAC7"
                                                        />
                                                        Delete
                                                    </div>
                                                    <div className="flex gap-[6px] rounded-md py-[7px] text-sm font-normal text-intg-text-4 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 hover:pl-[8px]">
                                                        <span>
                                                            <Archive
                                                                size="18"
                                                                color="#AFAAC7"
                                                            />
                                                        </span>
                                                        Archive
                                                    </div>
                                                    <div className="flex gap-[6px] rounded-md py-[7px] text-sm font-normal text-intg-text-4 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 hover:pl-[8px]">
                                                        <Edit
                                                            size="18"
                                                            color="#AFAAC7"
                                                        />
                                                        Edit
                                                    </div>
                                                    <div className="flex gap-[6px] rounded-md py-[7px] text-sm font-normal text-intg-text-4 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 hover:pl-[8px]">
                                                        <Radio
                                                            size="18"
                                                            color="#AFAAC7"
                                                        />
                                                        Publish
                                                    </div>
                                                    <div className="flex gap-[6px] rounded-md py-[7px] text-sm font-normal text-intg-text-4 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 hover:pl-[8px]">
                                                        <ClipboardCheck
                                                            size="18"
                                                            color="#AFAAC7"
                                                        />
                                                        Complete
                                                    </div>
                                                </Popover.Content>
                                            </Popover.Portal>
                                        </Popover.Root>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                    <TableFoot className="h-[50px] border-t border-intg-bg-7">
                        <TableFooterCell className="flex justify-between">
                            <button
                                disabled={!pageInfo?.hasPreviousPage}
                                onClick={() => handleGetMoreSurveys("backward")}
                                className={`${
                                    !pageInfo?.hasPreviousPage
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                } hover:bg-intg-bg-8} rounded-md border border-intg-bg-7 transition-all duration-300 ease-in`}
                            >
                                <Icon
                                    size="md"
                                    icon={ChevronLeft}
                                    className="font-normal text-intg-text-4 hover:cursor-pointer"
                                />
                            </button>
                            <button
                                disabled={!pageInfo?.hasNextPage}
                                onClick={() => handleGetMoreSurveys("forward")}
                                className={`${
                                    !pageInfo?.hasNextPage
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                } rounded-md border border-intg-bg-7  transition-all duration-300 ease-in hover:bg-intg-bg-8`}
                            >
                                <Icon
                                    size="md"
                                    icon={ChevronRight}
                                    className="font-normal text-intg-text-4 hover:cursor-pointer"
                                />
                            </button>
                        </TableFooterCell>
                        <TableFooterCell />
                        <TableFooterCell />
                        <TableFooterCell>
                            <span className="text-sm font-normal text-intg-text-4">
                                Rows per page: {surveysOnPage}
                            </span>
                        </TableFooterCell>
                        <TableFooterCell>
                            <span className="text-sm font-normal text-intg-text-4">
                                {surveyStartIndex} - {surveyEndIndex} of{" "}
                                {totalSurveys} Surveys
                            </span>
                        </TableFooterCell>
                    </TableFoot>
                </Table>
            </div>
        </div>
    );
};