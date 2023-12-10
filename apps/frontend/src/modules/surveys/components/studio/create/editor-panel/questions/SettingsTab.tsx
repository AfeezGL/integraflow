import { SelectInput, SwitchButton } from "@/ui";
import { EditorTextInput } from "../components/EditorTextInput";

type Props = {
    questionType: string;
};

export const SettingsTab = ({ questionType }: Props) => {
    return (
        <div className="space-y-3">
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Submit button" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Require answer to comment field(s)" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Randomize answers" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Randomize except last" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Answer required" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Consent checkbox" />
            </div>
            <div className="rounded bg-[#272138] p-3">
                <SwitchButton label="Show Disclaimer" />
            </div>
            <EditorTextInput
                label={"Disclaimer content"}
                placeholder="Type in your disclaimer here"
            />
            <SelectInput
                defaultValue=""
                options={[]}
                title="Number of answers"
            />
            <EditorTextInput
                label={"Text on the very left"}
                placeholder="Text on the very left"
            />
            <EditorTextInput
                label={"Text on the very right"}
                placeholder="Text on the very right"
            />
            <EditorTextInput
                label={"Positive text"}
                placeholder="Positive text"
            />
            <EditorTextInput
                label={"Negative text"}
                placeholder="Negative text"
            />
            <EditorTextInput
                label={"Consent Label"}
                placeholder="Type in consent label here"
            />
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <p className="text-sm">Selection limit Range</p>
                    <SelectInput defaultValue="" options={[]} />
                </div>
                <div>
                    <p className="text-sm">Min</p>
                    <SelectInput defaultValue="" options={[]} />
                </div>
                <div>
                    <p className="text-sm">Max</p>
                    <SelectInput defaultValue="" options={[]} />
                </div>
            </div>
        </div>
    );
};
