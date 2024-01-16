import {
    Dialog,
    DialogContent,
    DialogTrigger,
    GlobalSpinner,
    Header,
    Info,
} from "@/ui";
import { Document } from "@/ui/icons";
import { SurveyProvider } from "../../SurveyProvider";
import { useSurveyList } from "../../hooks/useSurveyList";
import SurveyCreate from "../SurveyCreate";
import CreateSurveyButton from "../partials/CreateSurveyButton";
import { SurveyList } from "./components/SurveyList";

export default function SurveyHome() {
    const { surveyList, loading, error } = useSurveyList();

    return (
        <SurveyProvider>
            <main className="flex h-full w-full flex-col">
                {error ? (
                    <Info message={error.message} />
                ) : (
                    <>
                        {loading ? (
                            <GlobalSpinner />
                        ) : (
                            <>
                                {surveyList?.length !== 0 ? (
                                    <SurveyList />
                                ) : (
                                    <main className="flex h-full w-full  justify-center">
                                        <>
                                            <div className="flex max-w-[386px] flex-col items-center justify-center  gap-[7px]">
                                                <Document
                                                    size="62"
                                                    color="#AFAAC7"
                                                />

                                                <div className="flex flex-col items-center gap-6">
                                                    <Header
                                                        title="Create your first survey"
                                                        description="Integraflow enables you to understand your customers
                            To get started, we'll need to integrate your SDK
                            product."
                                                        className="text-center"
                                                    />

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
                                            </div>
                                        </>
                                    </main>
                                )}
                            </>
                        )}
                    </>
                )}
            </main>
        </SurveyProvider>
    );
}
