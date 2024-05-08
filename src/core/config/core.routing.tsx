import { Route }                from "react-router-dom";
import { Routes }               from "react-router-dom";

import Home                     from "../view/public/home";
import About                    from "../view/public/about";
import NotFound                 from "../view/public/not.found";
import Login                    from "../view/public/login";

import ModelList                from "../view/core/model.list";

import ProviderDetails          from "../view/core/details/realization/provider/provider";

import OperationDetails         from "../view/core/details/financial/operation/operation";
import BudgetItemDetails        from "../view/core/details/financial/item/budget.item";
import BudgetItemGoals          from "../view/core/details/financial/item/budget.item.goals";

import ProjectDetails           from "../view/core/details/realization/project";
import ProviderExclusions       from "../view/core/details/realization/provider/provider.exclusions";
import ConsultationDetails      from "../view/core/details/realization/consultation/consultation";
import ConsultationDocuments    from "../view/core/details/realization/consultation/consultation.documents";
import ConsultationBudgetItems  from "../view/core/details/realization/consultation/consultation.budget.items";
import ConsultationMails        from "../view/core/details/realization/consultation/consultation.mails";
import ConsultationSubmissions  from "../view/core/details/realization/consultation/consultation.submissions";
import ContractDetails          from "../view/core/details/realization/contract/contract";
import ContractDocuments        from "../view/core/details/realization/contract/contract.documents";
import ContractMails            from "../view/core/details/realization/contract/contract.mails";

import MailDetails              from "../view/core/details/common/communication/mail";
import MailReferences           from "../view/core/details/common/communication/mail.references";
import Mails                    from "../view/core/details/common/communication/mails";

import StructureDetails         from "../view/core/details/common/administration/structure";
import JobDetails               from "../view/core/details/common/administration/job";
import EmployeeDetails          from "../view/core/details/common/administration/employee";

import RoomDetails              from "../view/core/details/common/environment/room";
import ShelfDetails             from "../view/core/details/common/environment/shelf";
import ArchiveBoxDetails        from "../view/core/details/common/environment/archive.box";
import FolderDetails            from "../view/core/details/common/environment/folder";

import UserDetails              from "../view/core/details/common/security/user";
import RoleDetails              from "../view/core/details/common/security/role";


function CoreRouting(){
	return (
        <Routes>
            <Route path='/'                                     element={<Home />} />
            <Route path='home'                                  element={<Home />} />
            <Route path='about'                                 element={<About />} />
            <Route path='login'                                 element={<Login />} />

            <Route path="provider"                              element={<About />}></Route>    
            <Route path="finance"                               element={<About />}></Route>
            <Route path="consultation"                          element={<About />}></Route>
            <Route path="contract"                              element={<About />}></Route>
            <Route path="amendment"                             element={<About />}></Route>
            <Route path="purchase"                              element={<About />}></Route>

            <Route path="administration"                        element={<About />}></Route>
            <Route path="environment"                           element={<About />}></Route>
            <Route path="communication"                         element={<About />}></Route>
            <Route path="security"                              element={<About />}></Route>

            <Route path="list/:entity"                          element={<ModelList />}></Route>
            <Route path="list/:entity/:proj"                    element={<ModelList />}></Route>

            <Route path="provider/:action"                      element={<ProviderDetails />}></Route>
            <Route path="provider/exclusions/:action"           element={<ProviderExclusions />}></Route>
            <Route path="financialOperation/:action"            element={<OperationDetails />}></Route>
            <Route path="budgetItem/:action"                    element={<BudgetItemDetails />}></Route>
            <Route path="budgetItem/goals"                      element={<BudgetItemGoals />}></Route>
            <Route path="project/:action"                       element={<ProjectDetails />}></Route>
            <Route path="consultation/:action"                  element={<ConsultationDetails />}></Route>
            <Route path="consultation/documents"                element={<ConsultationDocuments />}></Route>
            <Route path="consultation/budgetItems/:action"      element={<ConsultationBudgetItems />}></Route>
            <Route path="consultation/references/:action"       element={<ConsultationMails />}></Route>
            <Route path="consultation/submissions/:action"      element={<ConsultationSubmissions />}></Route>
            <Route path="contract/:action"                      element={<ContractDetails />}></Route>
            <Route path="contract/documents"                    element={<ContractDocuments />}></Route>
            <Route path="contract/references/:action"           element={<ContractMails />}></Route>

            <Route path="mail/:action"                          element={<MailDetails />}></Route>
            <Route path="mail/references/:action"               element={<MailReferences />}></Route>
            <Route path="mails"                                 element={<Mails />}></Route>
            
            <Route path="structure/:action"                     element={<StructureDetails />}></Route>
            <Route path="job/:action"                           element={<JobDetails />}></Route>
            <Route path="employee/:action"                      element={<EmployeeDetails />}></Route>

            <Route path="room/:action"                          element={<RoomDetails />}></Route>
            <Route path="shelf/:action"                         element={<ShelfDetails />}></Route>
            <Route path="archiveBox/:action"                    element={<ArchiveBoxDetails />}></Route>
            <Route path="folder/:action"                        element={<FolderDetails />}></Route>
            
            <Route path="user/:action"                          element={<UserDetails />}></Route>
            <Route path="role/:action"                          element={<RoleDetails />}></Route>

            <Route path="*"                                     element={<NotFound />}></Route>

        </Routes>
    )
}
export { CoreRouting };