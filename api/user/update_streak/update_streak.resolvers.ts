import { ApolloError } from 'apollo-server-express'
import { SCORE } from 'config/contants'
import { ScoreModel } from 'models/score'
import { UserModel } from 'models/user'
import { UpdateStreakResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { Days } from 'utils/Days'

const resolvers: Resolvers = {
  Mutation: {
    async UpdateStreak(
      _: Root,
      __: AnyArgs,
      ctx: Context
    ): Promise<UpdateStreakResponse> {
      const user = ctx.user!

      if (Days.diffPast(user.streak.active) === 0) {
        return {
          success: false,
          message: `You have ${
            Days.diffPast(user.streak.start) + 1
          } days streak, Keep up 👍`
        }
      }

      const start =
        Days.diffPast(user.streak.active) > 1 ? Date.now() : user.streak.start

      const active = Date.now()
      let message = 'Daily Streak Completed 🎉'

      // the scores array
      const scores = []

      // update the score
      const score = await ScoreModel.build({
        reason: SCORE.DAILY_CHECK.REASON,
        xp: SCORE.DAILY_CHECK.XP
      }).save()

      // add to scores
      scores.push(score)

      // check for 7days streak
      if (Days.diff(active, start) === 7) {
        message = '7 Days Streak Completed 🎉'

        // Score for 7 days streak
        const score = await ScoreModel.build({
          reason: SCORE['7_DAYS_STREAK'].REASON,
          xp: SCORE['7_DAYS_STREAK'].XP
        }).save()
        scores.push(score)
      }

      // check for 30days streak
      if (Days.diff(active, start) === 30) {
        message = '30 Days Streak Completed 🎉'

        // Score for 30 days streak
        const score = await ScoreModel.build({
          reason: SCORE['30_DAYS_STREAK'].REASON,
          xp: SCORE['30_DAYS_STREAK'].XP
        }).save()
        scores.push(score)
      }

      // check for 100days streak
      if (Days.diff(active, start) === 100) {
        message = '100 Days Streak Completed 🎉'

        // Score for 100 days streak
        const score = await ScoreModel.build({
          reason: SCORE['100_DAYS_STREAK'].REASON,
          xp: SCORE['100_DAYS_STREAK'].XP
        }).save()
        scores.push(score)
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        {
          streak: { start: start.toString(), active: active.toString() },
          $push: { scores: { $each: scores } }
        },
        { new: true }
      )

      if (!updatedUser) {
        throw new ApolloError(
          'Unable to update your Streak, Internal server error.'
        )
      }

      return {
        success: true,
        message
      }
    }
  }
}

export default resolvers
