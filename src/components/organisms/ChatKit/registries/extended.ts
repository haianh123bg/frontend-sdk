import type { ComponentRegistry } from '../types'
import { AvatarNode } from './extended/AvatarNode'
import { BadgeNode } from './extended/BadgeNode'
import { ChipNode } from './extended/ChipNode'
import { PriceNode } from './extended/PriceNode'
import { ProgressNode } from './extended/ProgressNode'
import { RatingNode } from './extended/RatingNode'

export const extendedComponentRegistry: ComponentRegistry = {
  badge: BadgeNode,
  rating: RatingNode,
  progress: ProgressNode,
  avatar: AvatarNode,
  chip: ChipNode,
  price: PriceNode,
}
