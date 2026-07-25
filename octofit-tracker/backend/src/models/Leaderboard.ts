import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekOf: { type: Date, required: true },
  },
  { timestamps: true },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
