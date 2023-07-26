
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TwoFactorAuthItem from './TwoFactorAuthItem';
import authStore from '../store/AuthStore';
import { Link } from 'react-router-dom';
import Plus  from '../plus.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const TwoFactorAuthList: React.FC = observer(() => {
  const [items, setItems] = useState(authStore.mfaCodes);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };
console.log(items)
  return (
    <div>
      <Link to={'/add'}>
       <img src={Plus} alt='plus'/>
     </Link>
     <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="twoFactorAuthList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((code, index) => (
                <Draggable key={code} draggableId={code} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TwoFactorAuthItem code={code} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default TwoFactorAuthList;
