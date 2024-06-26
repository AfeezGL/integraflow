import { planDetails } from "../../../utils";
export const Billing = () => {
    return (
        <div className="w-[675px] pt-10 text-intg-text-4">
            <div className="w-[515px]">
                <h3 className="font-semibold">Manage Billing</h3>
                <p className="text-sm">
                    Manage your billing information and invoice. for question about billing Contact
                    Integraflow@gmail.com or Github
                </p>
            </div>
            <hr className="my-6 border-[1px] border-intg-bg-4" />

            <div>
                <h3 className="font-semibold">Current plan</h3>
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <p className="justify-end self-end text-sm">You are currently on a free plan with ()</p>
                        {/* billing plans */}
                        {/* <div>
                            <Button text="View plans & upgrade" size="md" onClick={() => setOpenBillingModal(true)} />
                            <BillingModal open={openBillingModal} setOpenBillingModal={setOpenBillingModal} />
                        </div> */}
                    </div>
                    <div className="space-y-6">
                        {planDetails.map(({ icon: Icon, ...plan }) => {
                            return (
                                <div className="space-y-6 rounded-lg bg-intg-bg-9 p-4" key={plan.title}>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Icon size={16} />
                                            <p className="font-semibold">{plan.title}</p>
                                        </div>
                                        <p className="text-sm">{plan.description}</p>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex gap-3">
                                            <div>
                                                <p>Current</p>
                                                <p>250</p>
                                            </div>
                                            <p className="self-end rounded bg-intg-bg-20 px-2 py-1 text-xs text-intg-text-9">
                                                Free trial reached
                                            </p>
                                        </div>
                                        <div>
                                            <p>Free tier limit</p>
                                            <p>250</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
