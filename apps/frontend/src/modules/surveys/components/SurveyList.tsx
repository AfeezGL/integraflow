import { ROUTES } from "@/routes";
import { Dialog, DialogContent, DialogTrigger } from "@/ui";
import {
    Badge,
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
import { format, formatDistance, subDays } from "date-fns";
import {
    Archive,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    PencilLine,
    Radio,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyCreate from "./SurveyCreate";
import CreateSurveyButton from "./partials/CreateSurveyButton";

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
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    }[];
}

const headers = [
    { id: crypto.randomUUID(), title: "Name" },
    { id: crypto.randomUUID(), title: "Status" },
    { id: crypto.randomUUID(), title: "Creator" },
    { id: crypto.randomUUID(), title: "Date Created" },
    { id: crypto.randomUUID(), title: "Responses" },
];

export const SurveyList = ({ surveys }: SurveyListData) => {
    const navigate = useNavigate();
    const { orgSlug, projectSlug } = useParams();
    const [nameFilter, setNameFilter] = React.useState<string>("");
    const [statusFilter, setStatusFilter] = React.useState<string>("");

    const handleGetSurvey = (slug: string) => {
        navigate(
            ROUTES.STUDIO.replace(":orgSlug", orgSlug!)
                .replace(":projectSlug", projectSlug!)
                .replace(":surveySlug", slug),
        );
    };

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
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="h-[40px] w-[300px] text-ellipsis rounded-md border border-intg-bg-7 bg-transparent px-4 outline-none placeholder:text-intg-text-4"
                />
            </div>

            <div className="mt-8  flex flex-col">
                <Table className="scrollbar-hide table-auto rounded-md border border-intg-bg-7 ">
                    <TableHead className="border-b border-intg-bg-7 bg-intg-bg-8 font-light hover:cursor-pointer ">
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
                        {surveys
                            ?.filter((survey) => {
                                const nameMatch = survey.name
                                    .toLowerCase()
                                    .includes(nameFilter.toLowerCase());
                                const statusMatch = survey.status
                                    .toLowerCase()
                                    .includes(statusFilter.toLowerCase());

                                return nameMatch && statusMatch;
                            })
                            ?.map((survey) => {
                                return (
                                    <TableRow
                                        key={survey.id}
                                        onClick={() =>
                                            handleGetSurvey(survey.slug)
                                        }
                                        className="border-intg-bg-7 text-center font-light transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-8"
                                    >
                                        <TableCell>{survey.name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`${
                                                    survey.status ===
                                                    "PUBLISHED"
                                                        ? "border border-green-700 bg-green-300/[.05] text-green-800"
                                                        : survey.status ===
                                                          "DRAFT"
                                                        ? "border border-blue-700 bg-blue-300/[.05] text-blue-800"
                                                        : "border border-yellow-700 bg-yellow-300/[.05] text-yellow-800"
                                                } rounded-2xl`}
                                                icon={
                                                    survey.status === "DRAFT"
                                                        ? PencilLine
                                                        : survey.status ===
                                                          "ARCHIVED"
                                                        ? Archive
                                                        : Radio
                                                }
                                            >
                                                <span className="text-[12px]">
                                                    {survey.status}
                                                </span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {survey?.creator?.fullName}
                                            <br />
                                            <span className="text-[12px] text-intg-text-4">
                                                {survey?.creator.email}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {formatDistance(
                                                subDays(new Date(), 3),
                                                new Date(survey.createdAt),
                                                { addSuffix: true },
                                            )}
                                            <br />
                                            <span className="text-[12px] text-intg-text-4">
                                                {format(
                                                    new Date(survey.createdAt),
                                                    "MMM dd, yyyy",
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>0</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>

                    <TableFoot className="h-[50px] border-t border-intg-bg-7">
                        <TableFooterCell>
                            <Icon
                                size="sm"
                                icon={ChevronLeft}
                                className="font-light text-intg-text-4 hover:cursor-pointer"
                            />
                            <Icon
                                size="sm"
                                icon={ChevronFirst}
                                className="font-light text-intg-text-4 hover:cursor-pointer"
                            />
                            <Icon
                                size="sm"
                                icon={ChevronLast}
                                className="font-light text-intg-text-4 hover:cursor-pointer"
                            />
                            <Icon
                                size="sm"
                                icon={ChevronRight}
                                className="font-light text-intg-text-4 hover:cursor-pointer"
                            />
                        </TableFooterCell>
                        <TableFooterCell />
                        <TableFooterCell />
                        <TableFooterCell>
                            <span className="text-sm font-light text-intg-text-4">
                                Rows per page: 20
                            </span>
                        </TableFooterCell>
                        <TableFooterCell>
                            <span className="text-sm font-light text-intg-text-4">
                                1-20 of 100
                            </span>
                        </TableFooterCell>
                    </TableFoot>
                </Table>
            </div>
        </div>
    );
};
