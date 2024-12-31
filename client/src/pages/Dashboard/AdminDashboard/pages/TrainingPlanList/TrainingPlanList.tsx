import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  CategoryList,
  CategoryItem,
  ActionButton,
} from "./TrainingPlanList.styles";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { useDispatch } from "react-redux";
import { useTrainingPlans } from "../../../../../hooks/useTrainingPlans";
// import { setView } from "../../../../../redux/slices/viewSlice";
import { TrainingPlan } from "../../../../../types/types";
import TrainingModal from "../../../../../components/TrainingModal/TrainingModal";

const TrainingPlanList: React.FC = () => {
  const { plans, loading, getAllPlans, removePlan } = useTrainingPlans();
  //   const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllPlans();
  }, []);

  const handleEdit = (plan: TrainingPlan) => {
    console.log("Edit plan", plan);
    // dispatch(setView(Views.TRAINING_PLAN_CREATE));
    // dispatch({ type: "trainingPlans/setEditPlan", payload: plan });
    alert("Ova funkcionalnost još nije implementirana.");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Da li ste sigurni da želite da obrišete ovaj plan?")) {
      await removePlan(id);
      getAllPlans(); // Refresh the list after deletion
    }
  };

  const handleView = (plan: TrainingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Header>Planovi Treninga</Header>
      {loading && <p>Učitavanje...</p>}
      <CategoryList>
        {plans.map((plan) => (
          <CategoryItem key={plan._id}>
            {plan.name}
            <div>
              <ActionButton onClick={() => handleView(plan)}>
                <AiOutlineEye />
              </ActionButton>
              <ActionButton onClick={() => handleEdit(plan)}>
                <AiOutlineEdit />
              </ActionButton>
              <ActionButton onClick={() => plan._id && handleDelete(plan._id)}>
                <AiOutlineDelete />
              </ActionButton>
            </div>
          </CategoryItem>
        ))}
      </CategoryList>

      {/* Training Modal */}
      {selectedPlan && (
        <TrainingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedPlan}
        />
      )}
    </Container>
  );
};

export default TrainingPlanList;
