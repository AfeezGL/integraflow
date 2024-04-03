import { UserCountableEdge } from "@/generated/graphql";
import { useWorkspace } from "@/modules/workspace/hooks/useWorkspace";
import * as Popover from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    searchValue: string;
};

export const MemberList = ({ searchValue, setSearchValue }: Props) => {
    const { workspace } = useWorkspace();

    const [isSearchingMembers, setIsSearchingMembers] = useState(false);
    const [filteredMembers, setFilteredMembers] = useState<UserCountableEdge[] | []>([]);

    useEffect(() => {
        setIsSearchingMembers(Boolean(searchValue));

        if (searchValue) {
            const filtered = workspace?.members?.edges?.filter((member) =>
                `${member?.node?.firstName} ${member?.node?.lastName}`
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
            );
            setFilteredMembers(filtered as UserCountableEdge[]);
        } else {
            setFilteredMembers([]);
        }
    }, [searchValue, workspace?.members?.edges]);

    return (
        <div>
            <p className="font-semibold">
                {isSearchingMembers
                    ? `${filteredMembers.length} ${filteredMembers.length === 1 ? "member" : "members"}`
                    : `${workspace?.memberCount} ${workspace?.memberCount === 1 ? "member" : "members"}`}
            </p>
            <div>
                {isSearchingMembers
                    ? (filteredMembers as UserCountableEdge[]).map((member, index) => (
                          <div key={member.node.id}>
                              <div className="flex items-center justify-between px-2 py-3">
                                  <div className="basis-[60%]">
                                      <p className="font-sm font-medium">
                                          {member.node.firstName} {member.node.lastName}
                                      </p>
                                      <p className="font-sm">{member.node.email}</p>
                                  </div>
                                  <div className="font-sm basis-[20%] lowercase">{member.node.role}</div>
                                  <MoreHorizontal color="#AFAAC7" size={16} className="basis-[10%]" />
                              </div>
                              {index !== 0 && <hr className="border-[1px] border-intg-bg-4" />}
                          </div>
                      ))
                    : workspace?.members?.edges?.map((member, index) => (
                          <div key={member?.node?.id}>
                              {index !== 0 && <hr className="border-[1px] border-intg-bg-4" />}
                              <div className="flex items-center justify-between px-2 py-3">
                                  <div className="basis-[60%]">
                                      <p className="font-sm font-medium">
                                          {member?.node?.firstName} {member?.node?.lastName}
                                      </p>
                                      <p className="font-sm">{member?.node?.email}</p>
                                  </div>
                                  <div className="font-sm basis-[20%] lowercase">{member?.node?.role}</div>
                                  <Popover.Root>
                                      <Popover.Trigger asChild>
                                          <button className="w-fit rounded-md px-1 py-1 transition-all duration-300 ease-in hover:cursor-pointer hover:bg-intg-bg-1 data-[state=a]:bg-intg-bg-1">
                                              <MoreHorizontal color="#AFAAC7" />
                                          </button>
                                      </Popover.Trigger>

                                      <Popover.Portal>
                                          <Popover.Content
                                              align="end"
                                              alignOffset={5}
                                              className="w-[140px] rounded-md border border-intg-bg-4 bg-intg-bg-8 px-3 py-4"
                                          >
                                              <div
                                                  onClick={() => console.log("first")}
                                                  className="flex gap-[6px] rounded-md px-2 py-[7px] text-sm font-normal text-intg-text-4 hover:cursor-pointer hover:bg-intg-bg-1"
                                              >
                                                  Suspend user
                                              </div>
                                              <div
                                                  onClick={() => console.log("first")}
                                                  className="flex gap-[6px] rounded-md px-2 py-[7px] text-sm font-normal text-intg-text-4 hover:cursor-pointer hover:bg-intg-bg-1"
                                              >
                                                  Make admin
                                              </div>
                                          </Popover.Content>
                                      </Popover.Portal>
                                  </Popover.Root>
                              </div>
                              {index !== 0 && <hr className="border-[1px] border-intg-bg-4" />}
                          </div>
                      ))}
            </div>
        </div>
    );
};
