import useChannels from "@/modules/surveys/hooks/useChannels";
import { ChannelSettings } from "@/types";
import { Button, DatePicker, Switch, TextInput } from "@/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { LinkProps } from "./Link";

type Inputs = {
    name: string;
    singleUse: boolean;
    startDate?: Date;
    endDate?: Date;
};

type Props = LinkProps & {
    settings: ChannelSettings;
    close: () => void;
};

export default function EditLink({ link, settings, close }: Props) {
    const { updateChannel } = useChannels();
    const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
        defaultValues: {
            name: settings?.name ?? "",
            singleUse: settings?.singleUse ?? false,
            startDate: settings?.startDate
                ? new Date(settings?.startDate)
                : undefined,
            endDate: settings?.endDate ? new Date(settings.endDate) : undefined,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        updateChannel(link, {
            conditions: link.conditions,
            triggers: link.triggers,
            settings: JSON.stringify(data),
        });
        close();
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-lg flex-col gap-4">
                <TextInput
                    label="Link name"
                    {...register("name", { required: true })}
                />
                <Switch
                    label="Allow multiple response from the same device"
                    onChange={(event) => {
                        setValue("singleUse", event.target.value);
                    }}
                    value={watch("singleUse")}
                />
                <DatePicker
                    label="Start date"
                    value={watch("startDate")}
                    onChange={(event) => {
                        setValue("startDate", event.target.value);
                    }}
                />
                <DatePicker
                    label="End date"
                    onChange={(event) => {
                        setValue("endDate", event.target.value);
                    }}
                    value={watch("endDate")}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    text="Cancel"
                    variant="secondary"
                    type="button"
                    onClick={close}
                />
                <Button text="Save" type="submit" />
            </div>
        </form>
    );
}
